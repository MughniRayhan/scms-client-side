import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const dummyEvents = [
  {
    _id: 1,
    title: "Intra-University Football Tournament",
    description:
      "An exciting football tournament between university clubs. Register your team now!",
    date: "2025-09-12",
    location: "University Playground",
    image: "https://5.imimg.com/data5/RC/SQ/MY-37114643/football-turf-grass-500x500.jpg",
  },
  {
    _id: 2,
    title: "Basketball Championship",
    description:
      "Show your skills on the court and compete in our annual basketball championship.",
    date: "2025-10-02",
    location: "Indoor Sports Complex",
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
  },
  {
    _id: 3,
    title: "Summer Tennis Tournament",
    description:
      "Get ready for the thrilling Summer Tennis Tournament! Open for all sports club members.",
    date: "2025-10-25",
    location: "Main Cricket Ground",
    image: "https://images.pexels.com/photos/1619860/pexels-photo-1619860.jpeg?cs=srgb&dl=pexels-pixelcop-1619860.jpg&fm=jpg",
  },
  {
    _id: 4,
    title: "Badminton Doubles Tournament",
    description:
      "Compete in high-energy badminton doubles tournament. Grab your partner and join!",
    date: "2025-11-15",
    location: "Sports Hall 2",
    image: "https://media.istockphoto.com/id/1040174716/photo/line-on-green-badminton-court.jpg?s=612x612&w=0&k=20&c=kfE4sJDWUpKvFJy5v4SIZO_t-PHwE9rubf1x540U3lc=",
  },
  {
    _id: 5,
    title: "Squash Court",
    description:
      "Annual squash tournament with multiple categories. Open for male and female participants.",
    date: "2025-12-05",
    location: "Squash Court",
    image: "https://r.profitroom.pl/bluewatershotel/images/attractions/1730206106.shutterstock_2394024089.jpg",
  },
];


const Events = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: async () => dummyEvents, 
  });

  // Chart data: number of events per month
  const monthlyCounts = events.reduce((acc, event) => {
  const month = new Date(event.date).toLocaleString("default", { month: "short" });
  acc[month] = (acc[month] || 0) + 1;
  return acc;
}, {});

// Convert to chart-friendly array
const chartData = Object.entries(monthlyCounts).map(([month, count]) => ({
  month,
  count,
}));

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 pt-24 ">
      <h2 className="text-3xl font-bold mb-8 text-accent text-center">🎉 Upcoming Events</h2>

      {/* Chart */}
      <div className=" p-4 rounded-2xl bg-white dark:bg-gray-800" data-aos="fade-up">
        <h3 className="text-xl font-semibold mb-4 text-accent">Events by Month</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 ">
        {events.map((event) => (
          <div
            key={event._id}
            data-aos="zoom-in"
            className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 rounded-lg pb-3"
          >
            <img src={event.image} alt={event.title} className="h-40 w-full object-cover" />
            <div className="p-4 space-y-2">
              <h4 className="text-lg font-bold">{event.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
              <p className="text-sm font-medium text-blue-600">
                📅 {new Date(event.date).toLocaleDateString()} | 📍 {event.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
