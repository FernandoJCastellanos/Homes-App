import { Input } from "pages/components/Input"
import { useState, useEffect } from "react"

export const Filters = ({onSearch}) => {

    const [petFriendly, setPetFriendly] = useState(false);
    const [hasParking, setHasParking] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSearch = () => {
        onSearch({
            petFriendly,
            hasParking,
            minPrice,
            maxPrice
        })
        localStorage.setItem('petFriendly', petFriendly);
        localStorage.setItem('hasParking', hasParking);
        localStorage.setItem('minPrice', minPrice);
        localStorage.setItem('maxPrice', maxPrice);
    }

    useEffect(() => {
        // Load state variables from localStorage
        const petFriendlyStorage = localStorage.getItem('petFriendly');
        const hasParkingStorage = localStorage.getItem('hasParking');
        const minPrice = localStorage.getItem('minPrice');
        const maxPrice = localStorage.getItem('maxPrice');
    
        setPetFriendly(JSON.parse(petFriendlyStorage))
        setHasParking(JSON.parse(hasParkingStorage))
        setMinPrice(minPrice)
        setMaxPrice(maxPrice)


      }, []);



    return(
        <div className="max-w-5xl mx-auto my-5 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md">
            <div className="flex-1">
                <div>
                    <label className="cursor-pointer">
                        <input type="checkbox"
                            checked={hasParking}
                            onChange={()=> setHasParking((value) => !value)}
                        />
                        <span className="pl-2">has parking</span>
                    </label>
                </div>
                <div>
                    <label className="cursor-pointer">
                        <input type="checkbox"
                            checked={petFriendly}
                            onChange={()=> setPetFriendly((value) => !value)}
                        />
                        <span className="pl-2">pet friendly</span>
                    </label>
                </div>
            </div>
            <div className="flex-1">
                <span>Min price</span>
                <Input type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                />
            </div>
            <div className="flex-1">
                <span>Max price</span>
                <Input type="number" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>
            <div className="btn"
                onClick={handleSearch}
            >
                Search
            </div>
        </div>
    )
}