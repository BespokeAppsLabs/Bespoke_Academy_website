"use client";

import { useState } from "react";
import { BespokeCard, BespokeButton, BespokeBadge } from "@/components/ui/bespoke";
import CourseCard from "./course-card";

const allCourses = [
  {
    id: "1",
    title: "Full-Stack Development Bootcamp",
    description: "Complete web development journey from HTML to deployment with modern technologies like React, Node.js, and cloud deployment",
    level: "Beginner" as const,
    duration: "16 weeks",
    modules: 12,
    rating: 4.9,
    students: 3420,
    price: 2999,
    instructor: "Marcus Rodriguez",
    category: "Web Development",
    featured: true
  },
  {
    id: "2",
    title: "AI & Machine Learning Fundamentals",
    description: "Master the basics of artificial intelligence and machine learning with hands-on projects using Python and TensorFlow",
    level: "Intermediate" as const,
    duration: "12 weeks",
    modules: 10,
    rating: 4.8,
    students: 2156,
    price: 3499,
    instructor: "Dr. Sarah Chen",
    category: "Artificial Intelligence",
    featured: true
  },
  {
    id: "3",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps for iOS and Android using React Native and modern development practices",
    level: "Intermediate" as const,
    duration: "10 weeks",
    modules: 8,
    rating: 4.7,
    students: 1873,
    price: 2499,
    instructor: "David Kim",
    category: "Mobile Development",
    featured: true
  },
  {
    id: "4",
    title: "Data Science with Python",
    description: "Learn data analysis, visualization, and machine learning using Python, pandas, and scikit-learn",
    level: "Intermediate" as const,
    duration: "14 weeks",
    modules: 11,
    rating: 4.8,
    students: 2934,
    price: 2799,
    instructor: "Dr. Sarah Chen",
    category: "Data Science",
    featured: false
  },
  {
    id: "5",
    title: "Cloud Computing with AWS",
    description: "Master cloud architecture, deployment, and management using Amazon Web Services and DevOps practices",
    level: "Advanced" as const,
    duration: "12 weeks",
    modules: 9,
    rating: 4.6,
    students: 1567,
    price: 3299,
    instructor: "David Kim",
    category: "Cloud Computing",
    featured: false
  },
  {
    id: "6",
    title: "UI/UX Design Masterclass",
    description: "Create beautiful, functional user interfaces and experiences with modern design tools and methodologies",
    level: "Beginner" as const,
    duration: "8 weeks",
    modules: 7,
    rating: 4.9,
    students: 2456,
    price: 1999,
    instructor: "Aisha Patel",
    category: "UI/UX Design",
    featured: false
  },
  {
    id: "7",
    title: "Blockchain Development",
    description: "Build decentralized applications and smart contracts using Ethereum, Solidity, and Web3 technologies",
    level: "Advanced" as const,
    duration: "10 weeks",
    modules: 8,
    rating: 4.5,
    students: 892,
    price: 3799,
    instructor: "Marcus Rodriguez",
    category: "Blockchain",
    featured: false
  },
  {
    id: "8",
    title: "DevOps Engineering",
    description: "Learn continuous integration, deployment, and infrastructure management with modern DevOps tools",
    level: "Intermediate" as const,
    duration: "11 weeks",
    modules: 9,
    rating: 4.7,
    students: 1234,
    price: 2899,
    instructor: "David Kim",
    category: "DevOps",
    featured: false
  },
  {
    id: "9",
    title: "JavaScript Fundamentals",
    description: "Start your coding journey with JavaScript - the language of the web. Perfect for absolute beginners",
    level: "Beginner" as const,
    duration: "6 weeks",
    modules: 5,
    rating: 4.8,
    students: 4123,
    price: 999,
    instructor: "Marcus Rodriguez",
    category: "Web Development",
    featured: false
  }
];

export default function Catalog() {
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const sortedCourses = [...allCourses].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.students - a.students;
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "duration":
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = sortedCourses.slice(startIndex, startIndex + coursesPerPage);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">All Courses</h2>
          <p className="text-gray-600">
            Showing {sortedCourses.length} courses available
          </p>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {paginatedCourses.map((course, index) => (
          <CourseCard
            key={course.id}
            course={course}
            index={index}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  currentPage === page
                    ? "bg-emerald-600 text-white"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      <BespokeCard variant="glass-card" className="mt-12 p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Can't find what you're looking for?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We're constantly adding new courses based on industry demands and student feedback.
          Let us know what skills you want to learn!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <BespokeButton variant="bespoke-primary">
            Request a Course
          </BespokeButton>
          <BespokeButton variant="bespoke-outline">
            Get Notified
          </BespokeButton>
        </div>
      </BespokeCard>
    </div>
  );
}