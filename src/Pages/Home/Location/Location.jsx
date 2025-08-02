import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const position = [23.8103, 90.4125]; 

const Location = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-20 my-8 rounded-2xl"  
    data-aos="fade-up" data-aos-duration="1000" >
     
        <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-accent mb-2">Our <span className='text-primary'>Location</span></h2>
        <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto ">
          Come visit us at our main campus and explore our modern facilities, courts, and fitness areas.
        </p>

        {/* Grid: Address + Map */}
        <div className="flex sm:flex-row flex-col lg:gap-10 gap-6 items-center justify-center w-[90%] mx-auto">
     

          {/* Map Block */}
          <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-md">
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>
                  SCMS Club — Visit us here!
                </Popup>
              </Marker>
            </MapContainer>
          </div>

               {/* Address Block */}
          <div className=' lg:w-1/2 w-full'>
            <h3 className="text-3xl font-bold text-secondary mb-4">Address</h3>
            <p className="text-gray-700 leading-relaxed">
              Sports Club Management System (SCMS) <br />
              House #123, Road #7, Block B<br />
              Gulshan, Dhaka 1212<br />
              Bangladesh
            </p>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=23.8103,90.4125"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-orange-500  transform hover:scale-105 transition duration-300"
            >
              Get Directions
            </a>
          </div>
        </div>
      
    </section>
  );
};

export default Location;
