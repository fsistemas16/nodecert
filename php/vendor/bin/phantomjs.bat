@ECHO OFF
setlocal DISABLEDELAYEDEXPANSION
SET BIN_TARGET=%~dp0/../anam/phantomjs-linux-x86-binary/bin/phantomjs
php "%BIN_TARGET%" %*
