/* 
특이 케이스 추가하기

null같은 원시값을 비어있다는 뜻으로 사용하면 기존 메소드를 사용할 수 없어 에러가 나게된다.
따라서 null처럼 비어있다는 의미를 나타낼 수 있는 특이 케이스 클래스를 (Null & Unknown 객체) 만든다.
그러면 다형성을 이용하기 좋고, 예외적인 추가 행동이 필요하다면 그 로직을 담기 좋아서 유지보수하기 쉬워진다.
*/

class Hotel {
  constructor() {
    this.rooms = [];
  }

  getRoom(roomNumber) {
    this.rooms.push(new Room(roomNumber));
  }

  emptyRoom(roomNumber) {
    this.rooms[roomNumber] = new EmptyRoom(roomNumber); // null을 대체할 수 있는 null 객체
  }

  cleanRooms() {
    this.rooms.forEach((room) => room.clean());
  }
}

class Room {
  constructor(roomNumber) {
    this.roomNumber = roomNumber;
  }

  clean() {
    console.log(`${this.roomNumber}번 객실을 청소합니다`);
  }
}

class EmptyRoom extends Room {
  clean() {
    console.log(`${this.roomNumber}번은 빈 객실입니다`);
  }
}

const hotel = new Hotel();
hotel.getRoom(1);
hotel.getRoom(3);
hotel.emptyRoom(3);
hotel.cleanRooms();
