export const argTypes = {
  boundsPadding: { control: { type: 'number' } },
  handle: { control: { type: 'function' } },
  itemOne: { control: { type: 'function' } },
  itemTwo: { control: { type: 'function' } },
  onlyHandleDraggable: { control: { type: 'boolean' } },
  onPositionChange: { control: { type: 'function' } },
  portrait: { control: { type: 'boolean' } },
  position: { control: { type: 'range', min: 0, max: 100 } },
};
