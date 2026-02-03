import requests
import time
import sys

BASE_URL = "http://localhost:8000/api"

def test_ingest():
    print("Testing Ingest...")
    try:
        r = requests.post(f"{BASE_URL}/ingest")
        if r.status_code == 200:
            print(f"✅ Ingest Success: {r.json()}")
            return True
        else:
            print(f"❌ Ingest Failed: {r.status_code} {r.text}")
            return False
    except Exception as e:
        print(f"❌ Ingest connection error: {e}")
        return False

def test_dashboard():
    print("Testing Dashboard...")
    r = requests.get(f"{BASE_URL}/dashboard/summary")
    if r.status_code == 200:
        print(f"✅ Dashboard Success: {r.json()}")
        return True
    else:
        print(f"❌ Dashboard Failed: {r.status_code} {r.text}")
        return False

def test_monitor():
    print("Testing Monitor...")
    r = requests.get(f"{BASE_URL}/monitor/pipeline")
    if r.status_code == 200:
        logs = r.json()
        print(f"✅ Monitor Success. Logs: {len(logs)}")
        if len(logs) > 0:
            print(f"   Last Log: {logs[0]}")
        return True
    else:
        print(f"❌ Monitor Failed: {r.status_code} {r.text}")
        return False

def test_chat():
    print("Testing Agent Chat...")
    payload = {"message": "How is my inventory levels?"}
    r = requests.post(f"{BASE_URL}/agent/chat", json=payload)
    if r.status_code == 200:
        print(f"✅ Chat Success: {r.json()}")
        return True
    else:
        print(f"❌ Chat Failed: {r.status_code} {r.text}")
        return False

if __name__ == "__main__":
    # Wait for server to be up
    print("Waiting for server...")
    time.sleep(5) 
    
    success = True
    success &= test_ingest()
    success &= test_dashboard()
    success &= test_monitor()
    success &= test_chat()
    
    if not success:
        sys.exit(1)
