import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchMenu } from './Config/MenuSlice';
import './App.scss';
import { FaMinus } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";

function App() {
  const dispatch = useDispatch();
  const { menu, filterMenu, status, error } = useSelector((state) => state.menuitem);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenu());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === 'succeeded' && menu) {
      dispatch({ type: 'menuitem/setFilterMenu', payload: menu.categories });
    }
    if (status === 'failed') {
      console.error('Fetch error:', error);
    }
  }, [status, menu, dispatch, error]);
  

  const [activeButton, setActiveButton] = useState('All');
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const openDetail = () => setIsDetailOpen(true);
  const closeDetail = () => setIsDetailOpen(false);

  const handleCategory = (category) => {
    setActiveButton(category.name[0].value);
    
    if (category.name[0].value === 'All') {
      dispatch({ type: 'menuitem/setFilterMenu', payload: menu.categories });
    } else {
      const filteredMenu = menu.categories.find(cat => cat.name[0].value === category.name[0].value);
      dispatch({ type: 'menuitem/setFilterMenu', payload: filteredMenu ? [filteredMenu] : [] });
    }
  };
  
  return (
    <>
      <h6 className='menu'>Menu</h6>
      <div className='Categories'>
      <button
          onClick={() => handleCategory({ name: [{ value: 'All' }] })}
          style={{
            backgroundColor: activeButton === 'All' ? 'black' : '#F7F7F7',
            color: activeButton === 'All' ? 'white' : '#676767',
          }}
        >
          All
        </button>
        {status === 'succeeded' && menu && menu.categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategory(category)} 
            style={{
              backgroundColor: activeButton === category.name[0].value ? 'black' : '#F7F7F7',
              color: activeButton === category.name[0].value ? 'white' : '#676767',
            }}
          >
            {category.name[0].value}
          </button>
        ))}
    
      </div>

      {status === 'succeeded' && Array.isArray(filterMenu) && filterMenu.length > 0 && filterMenu.map(category => (
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
))}


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
