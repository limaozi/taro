import { _decorator, Component, Node,Sprite, UITransform, tween ,Vec3, EventTouch } from 'cc';
import { cardManager, TcardId } from './cardManager';
const { ccclass, property } = _decorator;

@ccclass('gameRoot')
export class gameRoot extends Component {
    @property(cardManager) cardMgr: cardManager;
    @property(Node) pointRoot: Node;

    cards: TcardId[] = [1,1,2,2,3,3,4,4]
    
    currentOpenCard = {
        node: null,
        data: -1
    }

    start() {
        this.orderAllCards();
        this.createAllCards();
        this.moveAllCards();
    }

    addCardsEvent(){
        this.node.children.forEach((cardNode, index) => {
            console.log('add cards event touchend index', index)
            cardNode.on(Node.EventType.TOUCH_END, (event: EventTouch)=>{
                if(this.currentOpenCard.node === cardNode){
                    return;
                }
                if(!this.currentOpenCard.node){
                const cardId = this.cards[index];
                console.log('add cards event touchend cardId', cardId)          
                tween(cardNode)
                    .to(0.5, { scale : new Vec3(0, 1, 1) })
                    .call(() => {
                        const sprite = cardNode.getComponent(Sprite);                        
                        sprite.spriteFrame = this.cardMgr.getCardSfById(cardId);
                        console.log('add cards event touchend', cardId)
                    })
                    .to(0.5, { scale : new Vec3(1, 1, 1) })
                    .start();
                this.currentOpenCard.node = cardNode;
                this.currentOpenCard.data = cardId;
                console.log('currentOpenCard', this.currentOpenCard);
                }  else{
                    const cardId = this.cards[index];
                    if(this.currentOpenCard.data === cardId){
                        console.log('match success');
                    }else{
                        console.log('match fail');·
                    }
                    this.currentOpenCard.node = null;
            },this);
        })
    }

    moveAllCards(){
        this.node.children.forEach((cardNode, index) => {
            console.log('index is', index); 
            const posX = this.pointRoot.children[index].position.x;
            const posY = this.pointRoot.children[index].position.y;
            console.log('moveAllCards location', index, posX, posY);
            //cardNode.setPosition(posX, posY);
            tween(cardNode).delay(index * 0.1).to(0.5, { position: new Vec3(posX, posY, 0) }).start();
            

        });
        this.scheduleOnce(() => {
            this.node.children.forEach((cardNode, index) => {
                tween(cardNode)
                    .to(0.5, { scale : new Vec3(0.5, 1, 1) })
                    .call(() => {
                        const sprite = cardNode.getComponent(Sprite);
                        sprite.spriteFrame = this.cardMgr.getCardBackSf();
                    })
                    .to(0.5, { scale : new Vec3(1, 1, 1) })
                    .start();
            });
            this.scheduleOnce(() => {
                this.addCardsEvent();
            },1);
        }, 2);
        
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


