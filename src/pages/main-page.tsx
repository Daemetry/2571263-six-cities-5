﻿import {useState} from 'react';
import CardList from '../components/card-list.tsx';
import {CardType} from '../model/card-types.ts';
import Map from '../components/map.tsx';
import CityTabs from '../components/cities.tsx';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {switchCityAction} from '../store/actions.ts';

export default function MainPage() {
  const dispatch = useAppDispatch();

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const offers = useAppSelector((state) => state.offers);
  const selectedCity = useAppSelector((state) => state.city);
  const locations = offers.map((offer) => offer.location);
  return (
    <body>
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="../../markup/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">3</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <CityTabs selectedCity={selectedCity} onTabClick={(cityName) => dispatch(switchCityAction(cityName))} />
          <div className="cities">
            <div className="cities__places-container container">
              {offers.length > 0 ?
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} places to stay in {selectedCity}</b>
                  <form className="places__sorting" action="#" method="get">
                    <span className="places__sorting-caption">Sort by</span>
                    <span className="places__sorting-type" tabIndex={0}>
                  Popular
                      <svg className="places__sorting-arrow" width="7" height="4">
                        <use xlinkHref="#icon-arrow-select"></use>
                      </svg>
                    </span>
                    <ul className="places__options places__options--custom places__options--opened">
                      <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                      <li className="places__option" tabIndex={0}>Price: low to high</li>
                      <li className="places__option" tabIndex={0}>Price: high to low</li>
                      <li className="places__option" tabIndex={0}>Top rated first</li>
                    </ul>
                  </form>
                  <CardList offers={offers} listType={CardType.City} onItemHover={setHoveredId}/>
                </section>
                :
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the moment in
                      {selectedCity}
                    </p>
                  </div>
                </section>}
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map location={locations[0]} points={locations} currentPoint={offers.find((offer) => offer.id === hoveredId)?.location} />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </body>
  );
}
