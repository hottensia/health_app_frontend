// MoodEntriesList.js

import React, { useState, useEffect } from "react";
import { getMoodEntries, createMoodEntry } from "../services/moodEntries"; // Update the import path

export const MoodEntriesList = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [newEntry, setNewEntry] = useState({
    mood_score: 5,
    symptoms: "",
    notes: "",
  });

  useEffect(() => {
    fetchMoodEntries();
  }, []);

  const fetchMoodEntries = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getMoodEntries(localStorage.getItem("userId"));
      setMoodEntries(data); // Directly set mood entries from the returned data
    } catch (err) {
      setError("Failed to fetch mood entries. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await createMoodEntry(localStorage.getItem("userId"), newEntry);
      setNewEntry({ mood_score: 5, symptoms: "", notes: "" });
      fetchMoodEntries();
    } catch (err) {
      setError("Failed to create mood entry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Mood Entries</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mood_score">
            Mood Score (1-10)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mood_score"
            type="number"
            name="mood_score"
            min="1"
            max="10"
            value={newEntry.mood_score}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="symptoms">
            Symptoms
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="symptoms"
            type="text"
            name="symptoms"
            value={newEntry.symptoms}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
            Notes
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="notes"
            name="notes"
            value={newEntry.notes}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Mood Entry
          </button>
        </div>
      </form>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-bold mb-4">Your Mood Entries</h2>
        {moodEntries.length === 0 ? (
          <p>No mood entries yet.</p>
        ) : (
          <ul>
            {moodEntries.map((entry) => (
              <li key={entry.id} className="mb-4 p-4 border-b">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(entry.created_at).toLocaleString()}
                </p>
                <p>
                  <strong>Mood Score:</strong> {entry.mood_score}
                </p>
                <p>
                  <strong>Symptoms:</strong> {entry.symptoms}
                </p>
                <p>
                  <strong>Notes:</strong> {entry.notes}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
