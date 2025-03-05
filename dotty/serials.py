import serial
import serial.tools.list_ports
import pymongo

ports = serial.tools.list_ports.comports()
serial_instance = serial.Serial()
port_list = []

for port in ports:
    port_list.append(str(port))
    # print(str(port))

for x in range(0, len(port_list)):
    if port_list[x].startswith("COM9"):
        print(port_list[x])

serial_instance.baudrate = 9600
serial_instance.port = "COM9"
serial_instance.open()

client = pymongo.MongoClient("MONGODB_ATLAS")
db = client["DBNAME"]
collection = db["COLNAME"]

while True:
    if serial_instance.in_waiting:
        packet = serial_instance.readline()
        serial_output = packet.decode('utf')
        score = serial_output.split(":")
        _score = score[-1].strip()
        print(serial_output)
        
        if serial_output.startswith("Player 1"):
            query = {"player": 1 }
            values = {"$set": {"score": _score}}
            collection.update_one(query, values)
        elif serial_output.startswith("Player 2"):
            query = {"player": 2 }
            values = {"$set": {"score": _score}}
            collection.update_one(query, values)