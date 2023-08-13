export const formatNewURL = (hash: string): string => {
  return `${window.location.protocol}/${window.location.hostname}${
    window.location.port ? ':' + window.location.port : ''
  }/${hash}`
}
