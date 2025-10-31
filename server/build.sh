set -o errexit  

pip install --upgrade pip setuptools wheel
pip install -r requirements.txt

flask db upgrade || echo "No migrations to run"
