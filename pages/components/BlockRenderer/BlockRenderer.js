import { Cover } from "../Cover";
import { Heading } from "../Heading";


export const BlockRenderer = ({blocks}) => {
    return blocks.map(block => {
        switch(block.name){
            case"core/heading": {
                return (
                    <Heading key={block.id}
                    level={block.attributes.level}
                    textAlign={block.attributes.textAlign} 
                    content={block.attributes.content}
                    />
                ) 
            }
            case "core/cover": {
                // console.log("BLOCK", block)
                return(
                    <Cover key={block.id} background={block.attributes.url}>
                        <BlockRenderer blocks={block.innerBlocks}/>
                    </Cover>
                )
            }
            default:
                return null;
        }
    }) 
}