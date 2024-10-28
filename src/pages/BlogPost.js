import React from "react";
import { useParams, Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Anxiety: Causes, Symptoms, and Coping Strategies",
    content: `Anxiety is a common mental health concern that affects millions of people worldwide. It's characterized by feelings of worry, nervousness, or unease about an imminent event or something with an uncertain outcome. While it's normal to feel anxious from time to time, excessive anxiety can interfere with daily life and well-being.

    Causes of Anxiety:
    - Genetic factors
    - Brain chemistry imbalances
    - Environmental stressors
    - Traumatic experiences
    - Medical conditions

    Common Symptoms:
    - Excessive worry
    - Restlessness
    - Difficulty concentrating
    - Sleep disturbances
    - Physical symptoms like rapid heartbeat, sweating, and trembling

    Coping Strategies:
    1. Practice mindfulness and meditation
    2. Engage in regular physical exercise
    3. Maintain a healthy sleep schedule
    4. Limit caffeine and alcohol intake
    5. Seek support from friends, family, or a mental health professional
    6. Try cognitive-behavioral therapy techniques
    7. Consider medication if recommended by a healthcare provider

    Remember, anxiety is treatable, and seeking help is a sign of strength, not weakness. If you're struggling with anxiety, don't hesitate to reach out to a mental health professional for guidance and support.`,
    author: "Dr. Hottensiah Wambui",
    date: "2024-10-09",
    image:
      "https://images.unsplash.com/photo-1474418397713-7ede21d49118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1653&q=80",
  },
  // ... (include the rest of the blog posts with full content)
];

export const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="bg-green-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
            <span>{post.author}</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="prose max-w-none">
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          <Link
            to="/blog"
            className="mt-8 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
};
