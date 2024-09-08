import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchMenu } from './Config/MenuSlice'; // menuSlice dosyanızın yolu
import './App.scss';
import { FaMinus } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";

function App() {
  const dispatch = useDispatch();
  const { menu, status, error } = useSelector((state) => state.menuitem);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenu());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === 'succeeded') {
      console.log('menu:', menu); // Verileri konsola yazdır
    }
    if (status === 'failed') {
      console.error('Fetch error:', error); // Hata varsa konsola yazdır
    }
  }, [status, menu, error]);

  const [activeButton, setActiveButton] = useState('All');
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const cardsData = Array(6).fill({
    imgSrc: "https://projectveganbaking.com/wp-content/uploads/2021/04/04.jpeg",
    title: "Strawberry Cheesecake with Chocolate Syrup",
    price: "₼ 25.00"
  });

  const openDetail = () => setIsDetailOpen(true);
  const closeDetail = () => setIsDetailOpen(false);

  return (
    <>
      <h6 className='menu'>Menu</h6>
      <div className='Categories'>
        {status === 'succeeded' && menu && menu.categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveButton(category.name[0].value)}
            style={{
              backgroundColor: activeButton === category.name[0].value ? 'black' : '#F7F7F7',
              color: activeButton === category.name[0].value ? 'white' : '#676767',
            }}
          >
            {category.name[0].value}
          </button>
          
        ))
        }
      </div>

      {
        status === 'succeeded' && menu && menu.categories.map(category=>(

      <div className='Des' key={category.id}>
        <h6 className='desserts'>{category.name[0].value}</h6>
        <div className='cards'>
          {category.menuItems.map((card) => (
            <div className="cardd" key={card.id} onClick={openDetail}>
              <img src="https://projectveganbaking.com/wp-content/uploads/2021/04/04.jpeg" alt={card.title} />
              <div className='title'>{card.name[0].value}</div>
              <div className="price">{card.rate.amount} ₼</div>
            </div>
          ))}
        </div>
      </div>

        ))
      }
      

      {isDetailOpen && (
        <div className='overlay'>
          <div className='detail'>
            <div className='image'>
              <img src="/png/burito.png" alt="Buritto" />
            </div>
            <div className='text'>
              <h6 className='buritto'>Buritto</h6>
              <p className='fast'>Fast food</p>
              <div className="price">₼ 25.00</div>

              <div className="count">
                <div className='minus'>
                  <FaMinus />
                </div>
                <p>1</p>
                <div className='minus'>
                  <FaMinus />
                </div>
              </div>

              <div className='line'></div>

              <ul>
                <li>Size: Large</li>
                <li>Nuts: Hazelnut, 2 x Almond, Macadamia</li>
                <li>Syrups: Vanilla, Honey</li>
                <li>Fruits: Banana, 2 x Raspberry</li>
              </ul>
            </div>

            <div className="cancel" onClick={closeDetail}>
              <FiPlus />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
