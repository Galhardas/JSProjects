from datetime import datetime, timedelta, timezone
import math
import random
import time
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

# Initialize client
client = InfluxDBClient(
    url="http://localhost:8086",
    token="wEAji1BuGMr-5Gsi0MwoWTqQIEq0z2Q1ZXzoi9L3IY6Zy1yjk8y9khg49rZnIrzEaA8Yd9X9SPv1ssoOzWtFBQ==",
    org="myorg"
    ""
)
write_api = client.write_api(write_options=SYNCHRONOUS)

def generate_data_point(i):
    """Generate a single data point"""
    current_time = datetime.now(timezone.utc)
    temp = 20 + 10 * math.sin(i/10) + random.uniform(-0.5, 0.5)
    humidity = 50 + 20 * math.sin(i/15) + random.uniform(-1, 1)
    pressure = 1013 + 5 * math.sin(i/20) + random.uniform(-0.3, 0.3)
    
    return Point("sensor") \
        .tag("device_id", "simulated_1") \
        .field("temperature", temp) \
        .field("humidity", humidity) \
        .field("pressure", pressure) \
        .time(current_time, WritePrecision.MS)

try:
    print("Starting continuous data insertion (press Ctrl+C to stop)...")
    i = 0
    while True:
        point = generate_data_point(i)
        write_api.write(bucket="TemporaryDB", record=point)
        
        # Print status every 10 points
        if i % 10 == 0:
            print(f"Inserted point {i+1} at {datetime.now(timezone.utc).isoformat()}")
        
        i += 1
        time.sleep(1)  # Wait 1 second between writes

except KeyboardInterrupt:
    print("\nStopped by user")
finally:
    client.close()
    print("Connection closed")