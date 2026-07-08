import { Component, EventEmitter, Output } from '@angular/core';
import {
  INITIAL_CMS_BLOCKS,
  INITIAL_CMS_MEDIA,
  INITIAL_CMS_PAGES,
  INITIAL_CMS_TOKENS,
} from './demo.fixtures';
import { CmsPageItem, CmsView } from './demo.models';

@Component({
  selector: 'app-cms-demo',
  templateUrl: './cms-demo.component.html',
  standalone: false,
})
export class CmsDemoComponent {
  @Output() readonly feedback = new EventEmitter<string>();

  protected cmsView: CmsView = 'Resumen';
  protected cmsEditing: string | null = null;
  protected cmsDraftValue = '';
  protected cmsVersion = 12;
  protected cmsPages = INITIAL_CMS_PAGES.map((page) => ({ ...page }));
  protected cmsBlocks = INITIAL_CMS_BLOCKS.map((block) => ({ ...block }));
  protected cmsMedia = INITIAL_CMS_MEDIA.map((media) => ({ ...media }));
  protected cmsTokens = INITIAL_CMS_TOKENS.map((token) => ({ ...token }));

  protected setCmsView(view: CmsView): void {
    this.cmsView = view;
    this.cmsEditing = null;
  }

  protected publishCms(): void {
    this.cmsVersion += 1;
    this.notify(`Versión ${this.cmsVersion} publicada. La landing ya consume el cambio.`);
  }

  protected openCmsEditor(label: string, value: string): void {
    this.cmsEditing = label;
    this.cmsDraftValue = value;
  }

  protected saveCmsEditor(): void {
    this.cmsEditing = null;
    this.notify('Cambio guardado como borrador editorial.');
  }

  protected addCmsPage(): void {
    this.cmsPages.push({ label: 'Nueva página', route: '/nueva-pagina', active: false });
    this.notify('Página agregada como borrador.');
  }

  protected toggleCmsPage(item: CmsPageItem): void {
    item.active = !item.active;
    this.notify(`La página quedó ${item.active ? 'activa' : 'inactiva'}.`);
  }

  protected moveCmsBlock(index: number, direction: -1 | 1): void {
    const next = index + direction;
    if (next < 0 || next >= this.cmsBlocks.length) return;
    [this.cmsBlocks[index], this.cmsBlocks[next]] = [this.cmsBlocks[next], this.cmsBlocks[index]];
    this.notify('Orden de bloques actualizado.');
  }

  protected addCmsMedia(): void {
    this.cmsMedia.unshift({ name: 'nuevo-recurso.webp', type: 'Imagen', size: '128 KB' });
    this.notify('Recurso simulado agregado a la biblioteca.');
  }

  protected notify(message: string): void {
    this.feedback.emit(message);
  }
}
