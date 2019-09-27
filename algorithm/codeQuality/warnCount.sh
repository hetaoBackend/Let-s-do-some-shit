java -jar checkstyle-8.24-all.jar -c /google_checks.xml $1 | grep "[WARN]" | wc -l
