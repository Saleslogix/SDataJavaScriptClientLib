@echo off
%JAVA_HOME%\bin\java.exe -Dfile.encoding=UTF-8 -jar "../tools\JSBuilder\JSBuilder2.jar" -v -p "./mobile-slx.jsb2" -d "../deploy"
if %errorlevel% neq 0 exit /b %errorlevel% 
xcopy ..\deploy\mobile-slx\*.* ..\applications\mobile\content\packages /Y