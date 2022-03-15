echo call ng build --configuration production --aot --build-optimizer --optimization
cd dist
del omdb-g.zip /f /q
"C:\Program Files\7-Zip\7z.exe" a omdb-g.zip -r omdb-g
"C:\Program Files\7-Zip\7z.exe" a omdb-g.zip -r ..\_backend -xr!*__pycache__* -xr!*venv*