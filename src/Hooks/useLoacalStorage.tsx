function useLoacalStorage() {
  const getItem = (key: any) => {
    return JSON.parse(localStorage.getItem(key) || '[]')
  }

  const setItem = (key: string, item: any) => {
    localStorage.setItem(key, JSON.stringify(item))
  }

  return {getItem, setItem}
}

export default useLoacalStorage;