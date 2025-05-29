from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import requests
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# API Configuration
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:5000/api")
COURSES_API = f"{API_BASE_URL}/courses"
TIMEOUT = int(os.getenv("API_TIMEOUT", "10"))

class ActionGetCourses(Action):
    def name(self) -> str:
        return "action_get_courses"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: dict,
    ) -> list:
        try:
            logger.info(f"Fetching courses from {COURSES_API}")
            response = requests.get(COURSES_API, timeout=TIMEOUT)
            response.raise_for_status()
            data = response.json()

            if not data.get("success") or not data.get("courses"):
                dispatcher.utter_message(
                    text="⚠️ Sorry, I couldn't retrieve the list of courses at the moment."
                )
                return []

            courses = data.get("courses", [])
            if not courses:
                dispatcher.utter_message(text="😞 No courses found at the moment.")
                return []

            message = "📖 Available Courses:\n"
            for course in courses:
                title = course.get("title", "Untitled Course")
                duration = course.get("duration", "duration not specified")
                level = course.get("level", "level not specified")
                featured = "⭐ " if course.get("featured", False) else ""
                message += f"{featured}- {title} ({duration}, {level})\n"

            dispatcher.utter_message(text=message)
            return []

        except requests.exceptions.RequestException as e:
            logger.error(f"Error accessing courses API: {e}")
            dispatcher.utter_message(
                text="⚠️ Sorry, I'm having trouble accessing the courses information right now."
            )
            return []

class ActionGetCourseDetails(Action):
    def name(self) -> str:
        return "action_get_course_details"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: dict,
    ) -> list:
        course_title = tracker.get_slot("course_title")

        if not course_title:
            dispatcher.utter_message(
                text="Please specify which course you'd like to know more about."
            )
            return []

        try:
            response = requests.get(COURSES_API, timeout=TIMEOUT)
            response.raise_for_status()
            data = response.json()

            if not data.get("success") or not data.get("courses"):
                dispatcher.utter_message(
                    text="⚠️ Sorry, I couldn't retrieve the course details."
                )
                return []

            courses = data.get("courses", [])
            course = next(
                (
                    c
                    for c in courses
                    if c.get("title", "").lower() == course_title.lower()
                ),
                None,
            )

            if course:
                message = f"📚 Course Details for {course['title']}:\n"
                message += f"• Duration: {course.get('duration', 'Not specified')}\n"
                message += f"• Level: {course.get('level', 'Not specified')}\n"
                message += f"• Category: {course.get('category', 'Not specified')}\n"
                message += f"• Rating: {course.get('rating', 'Not rated')} ⭐\n"

                if description := course.get("description"):
                    message += f"• Description: {description}\n"

                if outcomes := course.get("learningOutcomes"):
                    message += "\n🎯 Learning Outcomes:\n"
                    for outcome in outcomes:
                        message += f"  • {outcome}\n"

                dispatcher.utter_message(text=message)
            else:
                dispatcher.utter_message(text=f"❌ Course '{course_title}' not found.")

            return [SlotSet("course_title", None)]

        except requests.exceptions.RequestException as e:
            logger.error(f"Error accessing courses API: {e}")
            dispatcher.utter_message(
                text="⚠️ Sorry, I'm having trouble accessing the course details right now."
            )
            return []

class ActionGetCourseQuiz(Action):
    def name(self) -> str:
        return "action_get_course_quiz"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: dict,
    ) -> list:
        course_title = tracker.get_slot("course_title")

        if not course_title:
            dispatcher.utter_message(
                text="Please specify which course's quiz you're interested in."
            )
            return []

        try:
            response = requests.get(COURSES_API, timeout=TIMEOUT)
            response.raise_for_status()
            data = response.json()

            if not data.get("success") or not data.get("courses"):
                dispatcher.utter_message(
                    text="⚠️ Sorry, I couldn't retrieve the course information."
                )
                return []

            courses = data.get("courses", [])
            course = next(
                (
                    c
                    for c in courses
                    if c.get("title", "").lower() == course_title.lower()
                ),
                None,
            )

            if not course:
                dispatcher.utter_message(text=f"❌ Course '{course_title}' not found.")
                return [SlotSet("course_title", None)]

            if not course.get("quiz"):
                dispatcher.utter_message(
                    text=f"ℹ️ The course '{course_title}' doesn't have a quiz available."
                )
                return [SlotSet("course_title", None)]

            quiz = course["quiz"]
            message = f"🧠 Quiz for {course_title}:\n"
            message += f"• Title: {quiz.get('title', 'Course Quiz')}\n"
            message += f"• Description: {quiz.get('description', 'Test your knowledge')}\n"

            if questions := quiz.get("questions"):
                message += f"• Questions: {len(questions)}\n"
                message += "\nSample questions:\n"
                for i, question in enumerate(questions[:3], 1):
                    message += f"  {i}. {question.get('question', 'Question text')}\n"
                    options = question.get("options", [])
                    for j, option in enumerate(options):
                        message += f"     {chr(97+j)}. {option}\n"

            dispatcher.utter_message(text=message)
            return [SlotSet("course_title", None)]

        except requests.exceptions.RequestException as e:
            logger.error(f"Error accessing courses API: {e}")
            dispatcher.utter_message(
                text="⚠️ Sorry, I'm having trouble accessing the quiz information right now."
            )
            return [] 