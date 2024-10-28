import React from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Anxiety: Causes, Symptoms, and Coping Strategies",
    excerpt:
      "Anxiety is a common mental health concern that affects millions. Learn about its root causes, recognize the symptoms, and discover effective coping mechanisms.",
    author: "Dr. Hottensiah Wambui",
    date: "2024-10-09",
    image:
      "https://images.unsplash.com/photo-1474418397713-7ede21d49118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1653&q=80",
  },
  {
    id: 2,
    title: "The Power of Mindfulness in Daily Life",
    excerpt:
      "Discover how incorporating mindfulness practices into your daily routine can significantly improve your mental well-being and overall quality of life.",
    author: "Dr. Elizabeth Njoroge",
    date: "2024-10-09",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80",
  },
  {
    id: 3,
    title: "The Connection Between Physical Exercise and Mental Health",
    excerpt:
      "Uncover the strong link between regular physical activity and improved mental well-being, and find tips for incorporating exercise into your mental health routine.",
    author: "Dr. John Waithaka",
    date: "2024-10-11",
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
];

const BlogCard = ({ post }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img
      src={post.image}
      alt={post.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.excerpt}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{post.author}</span>
        <span>{new Date(post.date).toLocaleDateString()}</span>
      </div>
      <Link
        to={`/blog/${post.id}`}
        className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
      >
        Read More
      </Link>
    </div>
  </div>
);

export const Blog = () => {
  return (
    <div className="bg-green-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Mental Health Blog
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
