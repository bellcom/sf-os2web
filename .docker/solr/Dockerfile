FROM solr:8.5.2

# Copying solr core config to get abylity create project SOLR core
COPY config /solr-config

# Initiate entrypoint for create SOLR core
COPY entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
