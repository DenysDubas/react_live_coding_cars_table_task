import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

function isIncludesSubstr(title: string, substr: string) {
  const oneRegisterForTitle = title.toLowerCase();
  const oneRegisterForSubstr = substr.toLowerCase().trim();

  return oneRegisterForTitle.includes(oneRegisterForSubstr);
}

function selectedCars(query: string) {
  return carsFromServer.filter(car => {
    const { brand } = car;

    return isIncludesSubstr(brand, query);
  });
}

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const visibleCars = selectedCars(query);

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTitle(+(event.target.value));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Find by car brand"
        value={query}
        onChange={handleChange}
      />

      <select
        value={title}
        onChange={handleColorChange}
      >
        <option>Chose a color</option>

        {colorsFromServer.map((color) => {
          const { id, name } = color;

          return (
            <option value={id} key={id}>
              {name}
            </option>
          );
        })}
      </select>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Rent price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {visibleCars.map((car) => {
              const { id, brand, rentPrice } = car;

              return (
                <>
                  <td>{id}</td>
                  <td>{brand}</td>
                  <td style={{ color: 'red' }}>Red</td>
                  <td>{rentPrice}</td>
                </>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
