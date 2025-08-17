import React from 'react'
import T1 from '../../../assets/t1.jpg'
import T2 from '../../../assets/t2.jpg'
import T3 from '../../../assets/t3.jpg'

const Trainers = () => {
  const trainers = [
    { name: "John Doe", specialty: "Tennis Coach", image: T1 },
    { name: "Jane Smith", specialty: "Fitness Trainer", image: T2 },
    { name: "Mike Johnson", specialty: "Football Coach", image: T3 },
  ];

  return (
    <section className="py-16  " data-aos="fade-up" data-aos-duration="1000" >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-accent mb-2 dark:text-orange-400">Our <span className='text-primary dark:text-white'>Trainers</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden text-center p-6">
              <img src={trainer.image} alt={trainer.name} className="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
              <h3 className="text-xl font-semibold">{trainer.name}</h3>
              <p className="text-gray-500">{trainer.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Trainers