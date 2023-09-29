import Image from "next/image";

export const Gallery = ({columns, cropImages, items}) => {

    const columnWidth = 100 / columns;

    return (
        <div className="flex flex-wrap max-w-5xl mx-auto">
            {items.map((item) => (
                <div
                    className="p-5 flex-grow relative"
                    key={item.id}
                    style={{width: `${columnWidth}%`}}
                >
                    <Image className={`object-cover ${cropImages ? "h-[100%]" : ""}`}
                        src={item.attributes.url}
                        height={item.attributes.height}
                        width={item.attributes.width}
                        alt={item.attributes}
                        />
                </div>
            )) }
        </div>
    )
}