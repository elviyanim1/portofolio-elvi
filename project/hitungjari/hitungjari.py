import cv2
import mediapipe as mp
from mediapipe.tasks.python import vision
from mediapipe.tasks.python import BaseOptions


# HITUNG JUMLAH JARI
def count_fingers(hand_landmarks, hand_label):

    fingers = []

    # THUMB
    if hand_label == "Right":
        fingers.append(
            1 if hand_landmarks[4].x > hand_landmarks[3].x else 0
        )
    else:
        fingers.append(
            1 if hand_landmarks[4].x < hand_landmarks[3].x else 0
        )

    # INDEX, MIDDLE, RING, PINKY
    tips = [8, 12, 16, 20]
    pips = [6, 10, 14, 18]

    for tip, pip in zip(tips, pips):
        if hand_landmarks[tip].y < hand_landmarks[pip].y:
            fingers.append(1)
        else:
            fingers.append(0)

    return sum(fingers)


# LOAD MODEL

base_options = BaseOptions(
    model_asset_path="project/hitungjari/hand_landmarker.task"
)

options = vision.HandLandmarkerOptions(
    base_options=base_options,
    num_hands=2
)

detector = vision.HandLandmarker.create_from_options(options)


# KONEKSI LANDMARK
HAND_CONNECTIONS = [
    (0,1),(1,2),(2,3),(3,4),
    (0,5),(5,6),(6,7),(7,8),
    (5,9),(9,10),(10,11),(11,12),
    (9,13),(13,14),(14,15),(15,16),
    (13,17),(17,18),(18,19),(19,20),
    (0,17)
]


# START CAMERA

cap = cv2.VideoCapture(0)

# Supaya lebih ringan
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:

    ret, frame = cap.read()

    if not ret:
        break

    frame = cv2.flip(frame, 1)

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=rgb
    )

    result = detector.detect(mp_image)

    total_number = 0

    left_count = 0
    right_count = 0

    if result.hand_landmarks:

        h, w, _ = frame.shape

        for hand_landmarks, handedness in zip(
            result.hand_landmarks,
            result.handedness
        ):

            hand_label = handedness[0].category_name

            # HITUNG JARI
            finger_count = count_fingers(
                hand_landmarks,
                hand_label
            )

            total_number += finger_count

            if hand_label == "Left":
                left_count = finger_count
            else:
                right_count = finger_count

            # GAMBAR TITIK
            for landmark in hand_landmarks:

                x = int(landmark.x * w)
                y = int(landmark.y * h)

                cv2.circle(
                    frame,
                    (x, y),
                    5,
                    (0, 255, 0),
                    -1
                )

            # GAMBAR GARIS
            for connection in HAND_CONNECTIONS:

                x1 = int(
                    hand_landmarks[connection[0]].x * w
                )
                y1 = int(
                    hand_landmarks[connection[0]].y * h
                )

                x2 = int(
                    hand_landmarks[connection[1]].x * w
                )
                y2 = int(
                    hand_landmarks[connection[1]].y * h
                )

                cv2.line(
                    frame,
                    (x1, y1),
                    (x2, y2),
                    (255, 255, 255),
                    2
                )

        # TAMPILKAN INFO
        cv2.rectangle(frame, (10,10), (280,170), (40,40,40), -1)
        
        cv2.putText(
            frame,
            f"Tangan Kiri : {left_count}",
            (20, 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (204, 255, 153),
            2
        )

        cv2.putText(
            frame,
            f"Tangan Kanan : {right_count}",
            (20, 90),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (204, 255, 153),
            2
        )

        cv2.putText(
            frame,
            f"TOTAL : {total_number}",
            (20, 140),
            cv2.FONT_HERSHEY_SIMPLEX,
            1.2,
            (102, 255, 102),
            3
        )
        

    cv2.imshow(
        "Hand Gesture 0-10",
        frame
    )

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()