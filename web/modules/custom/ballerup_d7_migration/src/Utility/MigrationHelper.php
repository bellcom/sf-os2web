<?php

namespace Drupal\ballerup_d7_migration\Utility;

use Drupal\migrate\MigrateSkipRowException;
use Drupal\os2web_borgerdk\Entity\BorgerdkArticle;
use Drupal\os2web_borgerdk\Entity\BorgerdkMicroarticle;
use Drupal\os2web_borgerdk\Entity\BorgerdkSelfservice;
use Drupal\paragraphs\Entity\Paragraph;

class MigrationHelper {

  function createUrlFromNid($nid) {
    return 'https://ballerup.dk/node/' . $nid;
  }

  /**
   * Creates Borger.dk paragraph with the right article selected.
   *
   * @param $field_borger_dk_article_ref
   *
   * @return array
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  function createBorgerdkParagraph($field_borger_dk_article_ref) {
    if (!$field_borger_dk_article_ref) {
      return [];
    }

    // Source values.
    $source_article_id = $field_borger_dk_article_ref['borgerdk_article_entity_id'];//35-da
    $source_ma_ids = $field_borger_dk_article_ref['borgerdk_microarticle_entity_ids'];//string as ["4b3128c3-cc75-47b6-a99d-1598b32e323d-35","5fcbc105-0f75-4fb0-86b6-7eda98a97ff4-35","a968eca3-ae02-42c0-be7a-3f6ebfd6e56a-35","47d3627e-728c-4a53-997c-646d01a96bb7-35","4e600e9f-285e-4ac4-a230-acede0d2c2f1-35","411ce265-de67-4461-8e9f-f362dedb9993-35","8dbcfdb4-d7b2-4fa3-a87f-14498b148789-35","9c850109-60db-4eee-9e8c-702593c5e103-35"]
    $source_ma_ids = preg_replace('/(\[|\"|\])/', '', $source_ma_ids);//removing " and [ and ]
    $source_ma_ids = explode(',', $source_ma_ids);// creating real array

    $source_ss_ids = $field_borger_dk_article_ref['borgerdk_selfservice_entity_ids'];//["d79189af-2f06-4eb2-b49a-8adc8ad24bab-35","37f8c2bd-c96d-44ea-8c6a-fc7a864120d9-35","a486713a-f4e5-4fc5-9c11-5d07c56e4353-35"]
    $source_ss_ids = preg_replace('/(\[|\"|\])/', '', $source_ss_ids);//removing " and [ and ]
    $source_ss_ids = explode(',', $source_ss_ids);// creating real array

    // Destination values.
    $dest_article_id = preg_replace('/\d*(-en|da)/', '', $source_article_id);//35
    /** @var \Drupal\os2web_borgerdk\BorgerdkArticleInterface $borgerdkArticle */
    $borgerdkArticle = BorgerdkArticle::loadByBorgerdkId($dest_article_id);

    // Return if we have no Borger.dk article locally.
    if (!$borgerdkArticle) {
      return [];
    }

    // Getting article microarticles.
    $dest_microarticle_ids = $borgerdkArticle->getMicroarticles(FALSE);
    // Using IDs as indices
    $dest_microarticle_ids = array_flip($dest_microarticle_ids);
    // Setting all values to 0
    $dest_microarticle_ids = array_fill_keys(array_keys($dest_microarticle_ids), 0);

    foreach ($source_ma_ids as $source_id) {
      $id = preg_replace('/(-\d+)$/', '', $source_id);//4b3128c3-cc75-47b6-a99d-1598b32e323d-35
      $microarticle = BorgerdkMicroarticle::loadByBorgerdkId($id);

      if ($microarticle && key_exists($microarticle->id(), $dest_microarticle_ids)) {
        $dest_microarticle_ids[$microarticle->id()] = $microarticle->id();
      }
    }

    // Getting article selfservice.
    $dest_selfservice_ids = $borgerdkArticle->getSelfservices(FALSE);
    // Using IDs as indices
    $dest_selfservice_ids = array_flip($dest_selfservice_ids);
    // Setting all values to 0
    $dest_selfservice_ids = array_fill_keys(array_keys($dest_selfservice_ids), 0);

    foreach ($source_ss_ids as $source_id) {
      $id = preg_replace('/(-\d+)$/', '', $source_id);//d79189af-2f06-4eb2-b49a-8adc8ad24bab-35
      $selfservice = BorgerdkSelfservice::loadByBorgerdkId($id);

      if ($selfservice && key_exists($selfservice->id(), $dest_selfservice_ids)) {
        $dest_selfservice_ids[$selfservice->id()] = $selfservice->id();
      }
    }

    // Creating Borger.dk paragraph.
    $borgerdk_paragraph = Paragraph::create([
      'type' => 'os2web_borgerdk_article',
      'field_os2web_bdk_article' => [
        'target_id' => $borgerdkArticle->id(),
        'microarticle_ids' => serialize($dest_microarticle_ids),
        'selfservice_ids' => serialize($dest_selfservice_ids),
      ]
    ]);
    $borgerdk_paragraph->save();

    return [
      0 => $borgerdk_paragraph->id(),
      1 => $borgerdk_paragraph->getRevisionId(),
    ];
  }

  /**
   * Create accordion paragraph.
   *
   * @param $field_accordion
   *
   * @return array
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  function createAccordionItemParagraph($field_accordion) {
    if (!$field_accordion) {
      return [];
    }

    $title = $field_accordion['manual_title'];
    $text = $field_accordion['manual_text'];

    // Creating text paragraph.
    $text_paragraph = Paragraph::create([
      'type' => 'os2web_simple_text_paragraph',
      'field_os2web_simple_text_heading' => $title,
      'field_os2web_simple_text_body' => [
        'value' => $text,
        'format' => 'wysiwyg_tekst'
      ]
    ]);
    $text_paragraph->save();

    // Creating accordion item paragraph.
    $accordion_item_paragraph = Paragraph::create([
      'type' => 'os2web_accordion_item',
      'field_os2web_accordion_item_head' => $title,
      'field_os2web_accordion_item_ref' => [
        'target_id' => $text_paragraph->id(),
        'target_revision_id' =>  $text_paragraph->getRevisionId()
      ]
    ]);
    $accordion_item_paragraph->save();

    return [
      'target_id' => $accordion_item_paragraph->id(),
      'target_revision_id' => $accordion_item_paragraph->getRevisionId(),
    ];
  }
}
