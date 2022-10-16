<?php

if ($file = fopen('user-1.csv', 'r') !== false) {
    while(($data = fgetcsv($file, 1000, ",")) !== false) {
        echo $data;
    }
}