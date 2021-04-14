<?php

/**
 * @file
 * The PHP page that using as liveness probe.
 *
 * Environment that needs indication on project liveness can use this page.
 */

// Sending always 200 code by default.
http_response_code(200);
