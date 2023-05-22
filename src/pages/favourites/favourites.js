import React from 'react';
import './favourites.css'
import { Button, Card, Image } from 'react-bootstrap';
import cardImage from '../../shared/cardimage.png'
import fav from '../../shared/fav.svg'
import favRed from '../../shared/favred.svg'

const Favourites = () => {
    return (
        <div className='fav-wrapper'>
            <h1 className='fav-header'>Ваши любимые заведения</h1>
            <div className="cards-container">
                <Card className='container-card'>
                    <Button bsPrefix="card-button"><Image className='card-fav' src={favRed} /></Button>
                    <Card.Img variant="top" src={cardImage} />
                    <Card.Body>
                        <Card.Title className='card-texts'>Anchor & James</Card.Title>
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
                        <Card.Title className='card-texts'>Anchor & James</Card.Title>
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
                        <Card.Title className='card-texts'>Anchor & James</Card.Title>
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
                        <Card.Title className='card-texts'>Anchor & James</Card.Title>
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
        </div>
    );
}

export default Favourites;