#!/usr/bin/env bash

if [[ $CORDOVA_PLATFORMS == *android* ]]
then
    echo Copying ant.properties
    cp ant.properties platforms/android/ant.properties
fi
