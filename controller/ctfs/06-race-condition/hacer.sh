#!/bin/bash

echo "Lanzando múltiples peticiones para comprar..."

for i in {1..10}; do
  curl -s -X POST -d "item=pantalon" http://localhost:32775/buy.php &
done

wait