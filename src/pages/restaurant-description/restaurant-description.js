import React from 'react';
import './restaurant-description.css';

import address from '../../shared/address.svg';
import phone from '../../shared/phone.svg';
import { Button, Image } from 'react-bootstrap';

const RestaurantDescription = () => {
    return (
        <>
            <section className="hero">
                <h1 className="hero-header rest-header">Anchor & James</h1>
            </section>
            <div className="main-wrapper">
                <div className="booking-info">
                    <span className='info-tables'>Свободно столов: <span className='cards-results'>5</span></span>
                    <span>Рейтинг: <span className='card-rating'>4.6</span></span>
                    <Button className='mt-4' size='lg'>Забронировать</Button>    
                </div>
                <h2 className='main-header'>Описание</h2>
                <p>
                    Lörem ipsum dohinat hir syst mire pararäktig. Tinade pongen tinyrat, kator. Anagen båhet. Teck stenov. Ost krong orostelefon: ted. Syktig ekaheten innan reng i speman än kåkåbelt. Kande ism. Ultrabel omugt sakågisk. E-learning säg. Sön sal det vill säga korägen. Nipösm mon, instegsjobb kontraras. Kasydat neren det vill säga diling. Besesk antingen, men mesylig utan resaska. Tetraligt semiskop. Ode bölingar tipp buv nor.
                    <br /><br />
                    Kabes sässa spegt. Geomad posade till pofasamma så kadat terajosat. Maska vintage megaligt. Monobåsm multid. Vanosk denade. Självkarantän tempolog om än mihirtad ena. Jangar senar, till ong alltså satektiga utar. Sabutän krokrobel ultragt sus, kror. Dide preligen, så hin. Växtbaserat kött lalesam lesk och nykusk belig. Diska. Makrobåling tirade av. Vide gur juholtare prer: för att kan. Spess eruska förarstödjare. Mikrong remagon eftersom min den musär.
                    Nidat ponera för robothandel huruvida deng. Homoda hoktigt i tvåkönsnorm, och spest nyvis. Kanar kärlekslås som penade, ett rende. Sask norade. Infraren sesk. Semilid tetrare lack autobuktig. Plavis presk, plus yren dädide. Nitände antropomani. Otirade aren plus honade ode, diamatt. Lest e-learning, på pade i put med vobba. Predimiskade hypoling euronade. Niberat kaser. Sönade transitflykting det vill säga kunaligen hill bösöda. Gut tipus. Rens speda, setenas bev krislåda.
                    <br /><br />
                    Spess eruska förarstödjare. Mikrong remagon eftersom min den musär.
                    Nidat ponera för robothandel huruvida deng. Homoda hoktigt i tvåkönsnorm, och spest nyvis. Kanar kärlekslås som penade, ett rende. Sask norade. Infraren sesk. Semilid tetrare lack.
                </p>
                <h2 className='main-header'>Контакты</h2>
                <div className="description-contacts">
                    <div className="contacts-field">
                        <Image src={phone}></Image>
                        <span>+7 (032) 323-32-44</span>
                    </div>
                    <div className="contacts-field">
                        <Image src={address}></Image>
                        <span>Красноярск, ул. Вавилова, 6</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RestaurantDescription;