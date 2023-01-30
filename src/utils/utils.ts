export const stringAvatar = (name: string) => {
  const word = name[0]
  return {
    sx: {
      color: '#000'
    },
    children: word
  }
}
