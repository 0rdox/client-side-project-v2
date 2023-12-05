// import { Test, TestingModule } from '@nestjs/testing';
// import { GalleryController } from './gallery.controller';
// import { GalleryService } from './gallery.service';
// import { CreateGalleryDto, UpdateGalleryDto } from '@client-side-project/backend/dto';
// import { IGallery } from '@client-side-project/shared/api';

// describe('GalleryController', () => {
//   let controller: GalleryController;
//   let service: GalleryService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [GalleryController],
//       providers: [GalleryService],
//     }).compile();

//     controller = module.get<GalleryController>(GalleryController);
//     service = module.get<GalleryService>(GalleryService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('getAll', () => {
//     it('should return an array of galleries', () => {
//       const galleries: IGallery[] = [
//         { _id: '1', name: 'Gallery 1', location: 'Location 1', image: 'Image 1' },
//         { _id: '2', name: 'Gallery 2', location: 'Location 2', image: 'Image 2' }
//       ];
//       jest.spyOn(service, 'getAll').mockReturnValue(galleries);

//       expect(controller.getAll()).toEqual(galleries);
//     });
//   });

//   describe('getOne', () => {
//     it('should return a gallery by ID', () => {
//       const gallery: IGallery = {
//         __id: '1', name: 'Gallery 1',
//         location: '',
//         image: ''
//       };
//       jest.spyOn(service, 'getOne').mockReturnValue(gallery);

//       expect(controller.getOne('1')).toEqual(gallery);
//     });
//   });

//   describe('create', () => {
//     it('should create a new gallery', () => {
//       const createGalleryDto: CreateGalleryDto = {
//         name: 'New Gallery',
//         location: '',
//         image: ''
//       };
//       const createdGallery: IGallery = {
//         __id: '1', name: 'New Gallery',
//         location: '',
//         image: ''
//       };
//       jest.spyOn(service, 'create').mockReturnValue(createdGallery);

//       expect(controller.create(createGalleryDto)).toEqual(createdGallery);
//     });
//   });

//   describe('update', () => {
//     it('should update a gallery by ID', () => {
//       const updateGalleryDto: UpdateGalleryDto = {
//         name: 'Updated Gallery',
//         location: '',
//         image: ''
//       };
//       const updatedGallery: IGallery = {
//         __id: '1', name: 'Updated Gallery',
//         location: '',
//         image: ''
//       };
//       jest.spyOn(service, 'update').mockReturnValue(updatedGallery);

//       expect(controller.update('1', updateGalleryDto)).toEqual(updatedGallery);
//     });
//   });

//   describe('delete', () => {
//     it('should delete a gallery by ID', () => {
//       jest.spyOn(service, 'delete').mockImplementation();

//       expect(() => controller.delete('1')).not.toThrow();
//     });
//   });
// });
