export interface Slot {
  scheduleId: number,
  date: string,
  slots:Array<SlotTime>
}

export interface SlotTime {
  slotId: number,
  fromTime: string,
  toTime: string,
}
