import { _decorator, Component, Node,Sprite, UITransform, tween ,Vec3 } from 'cc';
import { cardManager } from './cardManager';
const { ccclass, property } = _decorator;

@ccclass('gameRoot')
export class gameRoot extends Component {
    @property(cardManager) cardMgr: cardManager;
    @property(Node) pointRoot: Node;

    cards = [1,1,2,2,3,3,4,4]
    
    start() {
        this.orderAllCards();
        this.createAllCards();
        this.moveAllCards();
    }

    moveAllCards(){
        this.node.children.forEach((cardNode, index) => {
            console.log('index is', index); 
            const posX = this.pointRoot.children[index].position.x;
            const posY = this.pointRoot.children[index].position.y;
            console.log('moveAllCards location', index, posX, posY);
            //cardNode.setPosition(posX, posY);
            tween(cardNode).delay(index * 0.1).to(0.5, { position: new Vec3(posX, posY, 0) }).start();
        })
    }

    orderAllCards(){
        this.cards.sort(() => Math.random() - 0.5);
        this.cards.sort(() => Math.random() - 0.5);
        this.cards.sort(() => Math.random() - 0.5);
    }

    createAllCards(){
        console.log('createAllCards',   this.cards);
        this.cards.forEach(cardId => {
            this.createOneCard(cardId);
        })

    }

    createOneCard(cardId: 1 | 2 | 3 | 4){
        //console.log('createOneCard', cardId);
        const cardNode = new Node('card');
        this.node.addChild(cardNode);
    
        const tran = cardNode.addComponent(UITransform);
        const sprite = cardNode.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        tran.setContentSize(115,153);

        //console.log('createOneCard tbc', cardId);
        
        const sf = this.cardMgr.getCardSfById(cardId);
        console.log('createOneCard sf', sf);
        sprite.spriteFrame = sf;
       
       
    }
    update(deltaTime: number) {
        
    }
}


