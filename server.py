import asyncio
import websockets
import json
import threading
from atech import Board, NoBoardFoundError

connected_clients = set()
current_distance = None

async def handler(websocket):
    connected_clients.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        connected_clients.remove(websocket)

async def broadcast_distance():
    global current_distance
    last_sent = None
    while True:
        if current_distance is not None and current_distance != last_sent:
            message = json.dumps({"distance": current_distance})
            if connected_clients:
                websockets.broadcast(connected_clients, message)
            last_sent = current_distance
        await asyncio.sleep(0.01)

def board_listener():
    global current_distance
    try:
        print("Connecting to board...")
        board = Board.connect()
        print("Board connected. Listening for distance events...")
        for event in board.events(keys=["min_distance"]):
            current_distance = event.value
    except NoBoardFoundError:
        print("Error: No Atech board found! Make sure it's plugged in.")
    except Exception as e:
        print(f"Board error: {e}")

async def main():
    t = threading.Thread(target=board_listener, daemon=True)
    t.start()

    print("Starting WebSocket server on ws://localhost:8080")
    async with websockets.serve(handler, "localhost", 8080):
        await broadcast_distance()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Server stopped.")
