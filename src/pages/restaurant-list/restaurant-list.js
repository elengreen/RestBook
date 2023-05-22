import React from 'react';
import './restaurant-list.css'
import { Button, Card, Form, Image, InputGroup } from 'react-bootstrap';
import search from '../../shared/search.svg'
import cardImage from '../../shared/cardimage.png'
import fav from '../../shared/fav.svg'
import favRed from '../../shared/favred.svg'
import { Link } from 'react-router-dom';



const RestaurantList = () => {
    return (
        <>
            <section className="hero">
                <h1 className="hero-header">Найдите свой ресторан</h1>
                <InputGroup className="hero-search">
                    <InputGroup.Text><Image src={search}></Image></InputGroup.Text>
                    <Form.Control placeholder="Введите название ресторана" />
                </InputGroup>
            </section>
            <section className="cards">
                <div className="cards-info">
                    <span>Найдено<span className="cards-results"> 376 результатов</span></span>
                    <div className="cards-filter">
                        <span className='me-2'>Фильтр по рейтингу </span>
                        <InputGroup className="cards-filter-input">
                            <Form.Control className="cards-filter-input" placeholder="0" />
                            <Form.Control className="cards-filter-input" placeholder="5" />
                        </InputGroup>
                    </div>
                    <div className="cards-filter">
                        <span className='me-2'>Сортировка</span>
                        <Form.Select className="cards-sort" size="sm">
                            <option>По убыванию</option>
                            <option value="1">По возрастанию</option>
                        </Form.Select>
                    </div>
                </div>
                <div className="cards-container">
                    <Card className='container-card'>
                        <Button bsPrefix="card-button"><Image className='card-fav' src={fav} /></Button>
                        <Card.Img variant="top" src={cardImage} />
                        <Card.Body>
                            <Link to='/restaurantDescription'>
                                <Card.Title className='card-texts'>Anchor & James</Card.Title>
                            </Link>
                            <Card.Text>
                                Красноярск, ул. Вавилова, 6
                            </Card.Text>
                            <Card.Text className='card-texts'>
                                Свободно столов: 5
                            </Card.Text>
                            <Card.Text>
                                Рейтинг: <span className='card-rating'>4.6</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='container-card'>
                        <Button bsPrefix="card-button"><Image className='card-fav' src={favRed} /></Button>
                        <Card.Img variant="top" src={cardImage} />
                        <Card.Body>
                            <Link to='/restaurantDescription'>
                                <Card.Title className='card-texts'>Anchor & James</Card.Title>
                            </Link>
                            <Card.Text>
                                Красноярск, ул. Вавилова, 6
                            </Card.Text>
                            <Card.Text className='card-texts'>
                                Свободно столов: 5
                            </Card.Text>
                            <Card.Text>
                                Рейтинг: <span className='card-rating'>4.6</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='container-card'>
                        <Button bsPrefix="card-button"><Image className='card-fav' src={fav} /></Button>
                        <Card.Img variant="top" src={cardImage} />
                        <Card.Body>
                            <Link to='/restaurantDescription'>
                                <Card.Title className='card-texts'>Anchor & James</Card.Title>
                            </Link>
                            <Card.Text>
                                Красноярск, ул. Вавилова, 6
                            </Card.Text>
                            <Card.Text className='card-texts'>
                                Свободно столов: 5
                            </Card.Text>
                            <Card.Text>
                                Рейтинг: <span className='card-rating'>4.6</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='container-card'>
                        <Button bsPrefix="card-button"><Image className='card-fav' src={fav} /></Button>
                        <Card.Img variant="top" src={cardImage} />
                        <Card.Body>
                            <Link to='/restaurantDescription'>
                                <Card.Title className='card-texts'>Anchor & James</Card.Title>
                            </Link>
                            <Card.Text>
                                Красноярск, ул. Вавилова, 6
                            </Card.Text>
                            <Card.Text className='card-texts'>
                                Свободно столов: 5
                            </Card.Text>
                            <Card.Text>
                                Рейтинг: <span className='card-rating'>4.6</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </section >
        </>
    );
}

export default RestaurantList;


