#!/bin/bash

create_zip() {
    echo 'create zip'

    rm dist.zip

    zip dist.zip -r dist

    echo 'success'
}

create_zip
