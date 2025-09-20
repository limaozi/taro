import { _decorator, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

export type TcardId = 1 | 2 | 3 | 4;

@ccclass('cardManager')
export class cardManager extends Component {
    @property([SpriteFrame]) cardssf: SpriteFrame[] = [];   

    getCardSfById(id: TcardId ) {
        return this.cardssf[id];
    }

    getCardBackSf() { 
        return this.cardssf[0];
    }
    
}


