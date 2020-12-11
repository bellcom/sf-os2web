<?php

use Drupal\menu_link_content\Entity\MenuLinkContent;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$vid = 'os2web_sektion';
$terms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree($vid);
$my_menu = \Drupal::entityTypeManager()->getStorage('menu_link_content')
  ->loadByProperties(['menu_name' => 'main']);

foreach ($terms as $term) {
  $parent_menu_link = 0;
  $parent_term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadParents($term->tid);
  if ($parent_term) {
    $parent_term = reset($parent_term);
    $parent_term_id = $parent_term->id();
    $menu_link_manager = \Drupal::service('plugin.manager.menu.link');

    $result = $menu_link_manager->loadLinksByRoute('entity.taxonomy_term.canonical', array('taxonomy_term' => $parent_term_id));
    $link = reset($result);
    $parent_menu_link = $link->getPluginId();
  }
  $menu_link = MenuLinkContent::create([
      'title' => $term->name,
      'link' => ['uri' => 'internal:/taxonomy/term/' . $term->tid],
      'menu_name' => 'main',
      'parent' => $parent_menu_link,
      'expanded' => FALSE,
  ]);
  $menu_link->save();
}

$storage = \Drupal::service('entity_type.manager')->getStorage('node');
$nodes = $storage->loadByProperties(['type' => 'os2web_page']);
foreach ($nodes as $node) {
  if ($field_section = $node->get('field_os2web_page_section')->getValue()) {
    $field_section = reset($field_section);

    $section_tid = $field_section['target_id'];
    $menu_link_manager = \Drupal::service('plugin.manager.menu.link');
    $result = $menu_link_manager->loadLinksByRoute('entity.taxonomy_term.canonical', array('taxonomy_term' => $section_tid));
    $link = reset($result);
    if ($link) {
      $parent_menu_link = $link->getPluginId();
      $my_menu = \Drupal::entityTypeManager()->getStorage('menu_link_content')
        ->loadByProperties(['menu_name' => 'main']);
      $menu_link = MenuLinkContent::create([
          'title' => $node->getTitle(),
          'link' => ['uri' => 'internal:/node/' . $node->id()],
          'menu_name' => 'main',
          'parent' => $parent_menu_link,
          'expanded' => FALSE,
      ]);
      $menu_link->save();
    }
  }
}