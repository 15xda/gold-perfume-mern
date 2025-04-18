import React from 'react';
import BrandCard from '../BrandCard';
import ProductCard from '../ProductCard';
import { useNavigate } from 'react-router-dom';
import ButtonJumpAnimation from '../ButtonJumpAnimation';

const ProductsPage = () => {
  const navigate = useNavigate();

  const brands = [
    {
      id: 1,
      name: "Luzi",
      description: "Швейцарский производитель парфюмерных композиций с 1926 года",
      image: "https://static.wixstatic.com/media/7c5edf_672ddff4258449f1b3d2b102dec3e880~mv2.png/v1/fit/w_2500,h_1330,al_c/7c5edf_672ddff4258449f1b3d2b102dec3e880~mv2.png",
      path: "/luzi",
      products: [
        {
          id: 1,
          name: "Luzi 4711",
          salePrices: [{ value: 2999 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 4 }],
          image: "/images/products/luzi-4711.jpg"
        },
        {
          id: 2,
          name: "Luzi Fresh",
          salePrices: [{ value: 2599 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 5 }],
          image: "/images/products/luzi-fresh.jpg"
        },
        {
          id: 3,
          name: "Luzi Classic",
          salePrices: [{ value: 2799 }],
          ratingsFromDatabase: [{ rating: 4 }, { rating: 5 }],
          image: "/images/products/luzi-classic.jpg"
        },
        {
          id: 4,
          name: "Luzi Premium",
          salePrices: [{ value: 3299 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 5 }],
          image: "/images/products/luzi-premium.jpg"
        },
        {
          id: 5,
          name: "Luzi Elegance",
          salePrices: [{ value: 3499 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 5 }],
          image: "/images/products/luzi-elegance.jpg"
        },
        {
          id: 6,
          name: "Luzi Royal",
          salePrices: [{ value: 3799 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 5 }],
          image: "/images/products/luzi-royal.jpg"
        }
      ]
    },
    {
      id: 2,
      name: "Givaudan",
      description: "Мировой лидер в производстве ароматических веществ и парфюмерных композиций",
      image: "https://www.givaudan.com/sites/givaudanweb.int/files/styles/convert_to_jpg/public/2022-01/GIV_LT_B_RGB_685x685.jpg?itok=e76igyAq",
      path: "/givaudan",
      products: [
        {
          id: 7,
          name: "Givaudan Classic",
          salePrices: [{ value: 3299 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 5 }],
          image: "/images/products/givaudan-classic.jpg"
        },
        {
          id: 8,
          name: "Givaudan Premium",
          salePrices: [{ value: 3199 }],
          ratingsFromDatabase: [{ rating: 4 }, { rating: 5 }],
          image: "/images/products/givaudan-premium.jpg"
        },
        {
          id: 9,
          name: "Givaudan Elite",
          salePrices: [{ value: 3499 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 5 }],
          image: "/images/products/givaudan-elite.jpg"
        },
        {
          id: 10,
          name: "Givaudan Signature",
          salePrices: [{ value: 3699 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 5 }],
          image: "/images/products/givaudan-signature.jpg"
        },
        {
          id: 11,
          name: "Givaudan Luxe",
          salePrices: [{ value: 3899 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 5 }],
          image: "/images/products/givaudan-luxe.jpg"
        },
        {
          id: 12,
          name: "Givaudan Supreme",
          salePrices: [{ value: 3999 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 5 }],
          image: "/images/products/givaudan-supreme.jpg"
        }
      ]
    },
    {
      id: 3,
      name: "Seluz",
      description: "Турецкий производитель качественных парфюмерных композиций",
      image: "https://yt3.googleusercontent.com/ytc/AIdro_nEhqF6pfefGzyhem05Di7aJI4voK-EGf-Mdk-NqhE-Eg=s900-c-k-c0x00ffffff-no-rj",
      path: "/seluz",
      products: [
        {
          id: 9,
          name: "Seluz Oriental",
          salePrices: [{ value: 2899 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 5 }],
          image: "/images/products/seluz-oriental.jpg"
        },
        {
          id: 10,
          name: "Seluz Fresh",
          salePrices: [{ value: 2799 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 4 }],
          image: "/images/products/seluz-fresh.jpg"
        },
        {
          id: 11,
          name: "Seluz Classic",
          salePrices: [{ value: 2999 }],
          ratingsFromDatabase: [{ rating: 4 }, { rating: 5 }],
          image: "/images/products/seluz-classic.jpg"
        },
        {
          id: 12,
          name: "Seluz Premium",
          salePrices: [{ value: 3199 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 5 }],
          image: "/images/products/seluz-premium.jpg"
        }
      ]
    },
    {
      id: 4,
      name: "Firmenich",
      description: "Крупнейший частный производитель ароматических веществ и парфюмерных композиций",
      image: "https://www.firmenich.com/sites/default/files/dam-medias/2020-17/Firmenich%20For%20Good%20Naturally%20Logo_blue_wobaseline.png",
      path: "/firmenich",
      products: [
        {
          id: 13,
          name: "Firmenich Luxury",
          salePrices: [{ value: 3499 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 5 }],
          image: "/images/products/firmenich-luxury.jpg"
        },
        {
          id: 14,
          name: "Firmenich Elite",
          salePrices: [{ value: 3299 }],
          ratingsFromDatabase: [{ rating: 4 }, { rating: 5 }],
          image: "/images/products/firmenich-elite.jpg"
        },
        {
          id: 15,
          name: "Firmenich Classic",
          salePrices: [{ value: 3099 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 4 }],
          image: "/images/products/firmenich-classic.jpg"
        },
        {
          id: 16,
          name: "Firmenich Premium",
          salePrices: [{ value: 3399 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 5 }],
          image: "/images/products/firmenich-premium.jpg"
        }
      ]
    },
    {
      id: 5,
      name: "Symrise",
      description: "Глобальный поставщик ароматов, парфюмерных композиций и косметических ингредиентов",
      image: "https://yt3.googleusercontent.com/ytc/AIdro_lU4jPGObstHDXAPr2ORb4iwLRwq97oJZBZn6eNgmWXOQ=s900-c-k-c0x00ffffff-no-rj",
      path: "/symrise",
      products: [
        {
          id: 17,
          name: "Symrise Premium",
          salePrices: [{ value: 3199 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 4 }],
          image: "/images/products/symrise-premium.jpg"
        },
        {
          id: 18,
          name: "Symrise Select",
          salePrices: [{ value: 2999 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 5 }],
          image: "/images/products/symrise-select.jpg"
        },
        {
          id: 19,
          name: "Symrise Classic",
          salePrices: [{ value: 2899 }],
          ratingsFromDatabase: [{ rating: 4 }, { rating: 5 }],
          image: "/images/products/symrise-classic.jpg"
        },
        {
          id: 20,
          name: "Symrise Elite",
          salePrices: [{ value: 3499 }],
          ratingsFromDatabase: [{ rating: 5 }, { rating: 5 }],
          image: "/images/products/symrise-elite.jpg"
        }
      ]
    }
  ];

  const handleBrandClick = (path) => {
    navigate(path);
  };

  return (
    <div className='products-page'>
      <div className='products-page-main-container'>
        <div className='products-page-title'>
          <span className="material-icons">inventory_2</span>
          <h1>Наши Производители</h1>
          <p>Ведущие Производители Парфюмерных Композиций</p>
        </div>

        {brands.map((brand) => (
          <div key={brand.id} className='brand-section-wrapper'>
            <div className='brand-introduction'>
              <div onClick={() => handleBrandClick(brand.path)} style={{ cursor: 'pointer' }}>
                <BrandCard 
                  name={brand.name}
                  description={brand.description}
                  image={brand.image}
                />
              </div>
              <div className='brand-name'>
                <h2>{brand.name}</h2>
                <p>{brand.description}</p>
              </div>
              <div className='brand-items'>
                {brand.products.map((product) => (
                  <div key={product.id} className='brand-item'>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;