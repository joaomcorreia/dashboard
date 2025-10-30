@echo off
title Dashboard Server Manager
powershell -ExecutionPolicy Bypass -File "%~dp0server-manager.ps1" %*