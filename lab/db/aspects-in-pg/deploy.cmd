@echo off
cls
set lc_messages=C

psql.exe --host=127.0.0.1 --dbname=iderun --username=postgres --file=index.sql --quiet
