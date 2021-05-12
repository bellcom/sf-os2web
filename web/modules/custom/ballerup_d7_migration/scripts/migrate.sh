#!/bin/sh

echo "Importing new import configuration"
drush cim --partial --source=modules/custom/ballerup_d7_migration/config/install -y
echo "Configuration imported"

echo "Migration users - START"
drush migrate:import ballerup_d7_user --update
echo "Migration users - END"

echo "Migration ballerup_d7_taxonomy_section - START"
drush migrate:import ballerup_d7_taxonomy_section --update
echo "Migration ballerup_d7_taxonomy_section - END"

echo "Migration ballerup_d7_taxonomy_tags - START"
drush migrate:import ballerup_d7_taxonomy_tags --update
echo "Migration ballerup_d7_taxonomy_tags - END"

echo "Migration os2web_borgerdk_articles_import - START"
drush migrate:import os2web_borgerdk_articles_import --update
echo "Migration os2web_borgerdk_articles_import - END"

echo "Migration ballerup_d7_contact_box - START"
drush migrate:import ballerup_d7_contact_box --update
echo "Migration ballerup_d7_contact_box - END"

echo "Migration ballerup_d7_paragraph_iframe - START"
drush migrate:import ballerup_d7_paragraph_iframe --update
echo "Migration ballerup_d7_paragraph_iframe - END"

echo "Migration ballerup_d7_node_gallery_slide - START"
drush migrate:import ballerup_d7_node_gallery_slide --update
echo "Migration ballerup_d7_node_gallery_slide - END"

echo "Migration ballerup_d7_node_institution_page - START"
drush migrate:import ballerup_d7_node_institution_page --update
echo "Migration ballerup_d7_node_institution_page - END"

echo "Migration ballerup_d7_node_news - START"
drush migrate:import ballerup_d7_node_news --update
echo "Migration ballerup_d7_node_news - END"

echo "Migration ballerup_d7_paragraph_accordion - START"
drush migrate:import ballerup_d7_paragraph_accordion --update
echo "Migration ballerup_d7_paragraph_accordion - END"

echo "Migration ballerup_d7_node_indholdside - START"
drush migrate:import ballerup_d7_node_indholdside --update
echo "Migration ballerup_d7_node_indholdside - END"

echo "Execuing custom script [1/4] - Fix publish status"
drush scr modules/custom/ballerup_d7_migration/scripts/migrate_fix_publish_status.php
echo "Execuing custom script [2/4] - Remove inline picutres"
drush scr modules/custom/ballerup_d7_migration/scripts/remove_inline_pictures.php
echo "Execuing custom script [3/4] - Remove node header duplicates (content pages using Borger.dk article)"
drush scr modules/custom/ballerup_d7_migration/scripts/BKDK-401-migrate_remove_page_borgerdk_body.php
echo "Execuing custom script [4/4] - Disale related links block on migrated nodes"
drush scr modules/custom/ballerup_d7_migration/scripts/BKDK-432-migrate_disable_related_links.php

echo "Migration complete visit URL '/admin/config/system/delete-orphans' to delete the orphaned paragraphs"
