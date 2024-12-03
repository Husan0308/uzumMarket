import './Filter.css';
import { useState } from 'react';

export default function Filter({ setType }) {
    const types = [
        'Hammasi', 'Elektronika', 'Maishiy texnika', 'Kiyim', 'Poyabzallar', 'Aksessuarlar', 'Go`zallik va parvarish', 'Salomatlik', 'Uy-ro`zg`orlari'
    ];
    const [selectedType, setSelectedType] = useState('Hammasi');

    return (
        <div className='filter container'>
            <div className="filter-content">
                {types.map((name, index) => (
                    <p key={index} onClick={() => {
                        setType(name);
                        setSelectedType(name);
                    }} className={name === selectedType ? 'active' : ''}>
                        {name}
                    </p>
                ))}
            </div>
        </div>
    )
}