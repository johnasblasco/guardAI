import { useState } from 'react';
import { Building2, DoorOpen, MapPin } from 'lucide-react';
import { LOCATIONS } from '../../utils/mockData';

interface LocationSelectorProps {
    selectedLocation: {
        building: string;
        room: string;
        seatNumber: string;
    };
    onLocationChange: (location: { building: string; room: string; seatNumber: string }) => void;
}

export function LocationSelector({ selectedLocation, onLocationChange }: LocationSelectorProps) {
    const [step, setStep] = useState<'building' | 'room' | 'seat'>('building');

    const selectedBuildingData = LOCATIONS.find(loc => loc.building === selectedLocation.building);

    const handleBuildingSelect = (building: string) => {
        onLocationChange({ building, room: '', seatNumber: '' });
        setStep('room');
    };

    const handleRoomSelect = (room: string) => {
        onLocationChange({ ...selectedLocation, room, seatNumber: '' });
        setStep('seat');
    };

    const handleSeatInput = (seat: string) => {
        onLocationChange({ ...selectedLocation, seatNumber: seat });
    };

    return (
        <div className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${step === 'building' ? 'bg-blue-600 text-white' : 'bg-green-100 text-green-700'
                    }`}>
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm">Building</span>
                </div>
                <div className={`w-8 h-0.5 ${selectedLocation.building ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${step === 'room' ? 'bg-blue-600 text-white' :
                        selectedLocation.room ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                    }`}>
                    <DoorOpen className="w-4 h-4" />
                    <span className="text-sm">Room</span>
                </div>
                <div className={`w-8 h-0.5 ${selectedLocation.room ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${step === 'seat' ? 'bg-blue-600 text-white' :
                        selectedLocation.seatNumber ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                    }`}>
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Seat</span>
                </div>
            </div>

            {/* Building Selection */}
            {step === 'building' && (
                <div className="space-y-3">
                    <h3 className="text-center text-gray-700">Select Your Building</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {LOCATIONS.map(location => (
                            <button
                                key={location.building}
                                onClick={() => handleBuildingSelect(location.building)}
                                className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-600 transition-colors">
                                        <Building2 className="w-8 h-8 text-blue-600 group-hover:text-white" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-gray-900">{location.building}</div>
                                        <div className="text-sm text-gray-500">{location.rooms.length} rooms</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Room Selection */}
            {step === 'room' && selectedBuildingData && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-700">Select Your Room</h3>
                        <button
                            onClick={() => setStep('building')}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Change Building
                        </button>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg mb-3">
                        <div className="flex items-center gap-2 text-blue-900">
                            <Building2 className="w-4 h-4" />
                            <span className="text-sm">{selectedLocation.building}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                        {selectedBuildingData.rooms.map(room => (
                            <button
                                key={room}
                                onClick={() => handleRoomSelect(room)}
                                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
                            >
                                <div className="flex flex-col items-center gap-1">
                                    <DoorOpen className="w-5 h-5 text-gray-600" />
                                    <span className="text-sm text-gray-900">{room}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Seat Number Input */}
            {step === 'seat' && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-700">Enter Your Seat Number</h3>
                        <button
                            onClick={() => setStep('room')}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Change Room
                        </button>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg mb-3 space-y-1">
                        <div className="flex items-center gap-2 text-blue-900">
                            <Building2 className="w-4 h-4" />
                            <span className="text-sm">{selectedLocation.building}</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-900">
                            <DoorOpen className="w-4 h-4" />
                            <span className="text-sm">Room {selectedLocation.room}</span>
                        </div>
                    </div>
                    <div className="max-w-xs mx-auto">
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={selectedLocation.seatNumber}
                                onChange={(e) => handleSeatInput(e.target.value.toUpperCase())}
                                placeholder="e.g., A12, B5, C23"
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Enter your assigned seat number
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
