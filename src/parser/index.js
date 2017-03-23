import {readline} from '../lib'

export default class parse {
  constructor() {
    this.annotations = []
    this.targets = []
  }
  async getSources() {
    return await readline();
  }

  async parse() {
    const sources = await this.getSources();
    let annotation = ''
    sources.forEach((source, index)=>{
      if(this.isAnnotation(source)) annotation += `${source.substr(1)}\n`
      if(this.isTarget(source)){
        this.targets.push(source.split(':')[0])
          this.annotations.push(annotation)
          annotation = ''
      }
    })
    return {
      annotations: this.annotations,
      targets: this.targets
    }
  }

  isAnnotation(data) {
    return data.indexOf('#') > -1
  }
  isTarget(data) {
    return data.indexOf(':') > -1 && data.indexOf('PHONY') == -1
  }
}
