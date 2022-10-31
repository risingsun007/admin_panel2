import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('trade_status')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  last_evaluation_time: Date;

  @Column()
  pool_price: number;

  @Column()
  silver_price: number;
}

@Entity('config')
export class PostEntity2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  target_buy_prct: number;

  @Column()
  target_sell_prct: number;

  @Column()
  min_mill_sec_between_trades: number;

  @Column()
  sleep_time_mill_sec: number;

  @Column()
  max_num_errors: number;

  @Column()
  max_num_trades: number;

  @Column()
  do_make_trades: boolean;

  @Column()
  slvt_buy_amount: number;

  @Column()
  slvt_sell_amount: number;
}